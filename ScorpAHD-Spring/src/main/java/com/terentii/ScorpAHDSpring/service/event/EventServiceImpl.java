package com.terentii.ScorpAHDSpring.service.event;

import com.terentii.ScorpAHDSpring.model.event.Event;
import com.terentii.ScorpAHDSpring.model.event.EventDto;
import com.terentii.ScorpAHDSpring.model.event.SingleEventDto;
import com.terentii.ScorpAHDSpring.repository.EventRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public EventDto createEvent(EventDto eventDto) {
        Event event = new Event();
        BeanUtils.copyProperties(eventDto, event);
        Event savedEvent = eventRepository.save(event);
        EventDto savedEventDto = new EventDto();
        BeanUtils.copyProperties(savedEvent, savedEventDto);
        return savedEventDto;
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
}

