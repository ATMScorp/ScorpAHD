package com.terentii.ScorpAHDSpring.service.event;

import com.terentii.ScorpAHDSpring.model.event.Event;
import com.terentii.ScorpAHDSpring.model.event.EventDto;
import com.terentii.ScorpAHDSpring.model.event.SingleEventDto;
import com.terentii.ScorpAHDSpring.model.user.User;
import com.terentii.ScorpAHDSpring.repository.EventRepository;
import com.terentii.ScorpAHDSpring.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final EventRepository eventRepository;
    private final JavaMailSender javaMailSender;

    private final UserRepository userRepository;

    public EventServiceImpl(EventRepository eventRepository,
                            UserRepository userRepository,
                            JavaMailSender javaMailSender) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public EventDto createEvent(EventDto eventDto) {
        Event event = new Event();
        BeanUtils.copyProperties(eventDto, event);
        Event savedEvent = eventRepository.save(event);

        String subject = "New Event Created";

        String body = "Dear student,\n\nWe are excited to inform you that a new event titled '"
                + eventDto.getTitle() + "' has been added to the schedule. " +
                "Please review the details and make sure to mark your calendar." +
                "\n\nBest regards,\nThe Academic Affairs Team";
        sendMailToAllUsers(subject, body);

        EventDto savedEventDto = new EventDto();
        BeanUtils.copyProperties(savedEvent, savedEventDto);
        return savedEventDto;
    }

    @Override
    public void sendMailToAllUsers(String subject, String body) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            sendMail(user.getEmail(), subject, body);
        }
    }

    private void sendMail(String recipient, String subject, String body) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom(fromEmail);
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(body);
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(event -> {
                    EventDto eventDto = new EventDto();
                    BeanUtils.copyProperties(event, eventDto);
                    return eventDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public SingleEventDto getEventById(Long eventId) {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        SingleEventDto singleEventDto = new SingleEventDto();
        optionalEvent.ifPresent(event -> singleEventDto.setEventDto(event.getEventDto()));
        return singleEventDto;
    }

    @Override
    public EventDto updateEvent(Long eventId, EventDto eventDto) {
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setDescription(eventDto.getDescription());
            event.setTitle(eventDto.getTitle());
            event.setStartTime(eventDto.getStartTime());
            event.setEndTime(eventDto.getEndTime());
            event.setLocation(eventDto.getLocation());
            event.setPhotoUrl(eventDto.getPhotoUrl());
            Event updatedEvent = eventRepository.save(event);
            EventDto updatedEventDto = new EventDto();
            updatedEventDto.setId(updatedEvent.getId());
            return updatedEventDto;
        }
        return null;
    }

    @Override
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    @Override
    public void deleteExpiredEvents() {
        LocalDateTime now = LocalDateTime.now();
        List<Event> expiredEvents = eventRepository.findByEndTimeBefore(now);
        eventRepository.deleteAll(expiredEvents);
    }
}

