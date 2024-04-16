package com.terentii.ScorpAHDSpring.service.event;

import com.terentii.ScorpAHDSpring.model.event.EventDto;
import com.terentii.ScorpAHDSpring.model.event.SingleEventDto;

import java.util.List;

public interface EventService {
    EventDto createEvent(EventDto eventDto);

    void sendMailToAllUsers(String subject, String body);

    List<EventDto> getAllEvents();
    SingleEventDto getEventById(Long eventId);
    EventDto updateEvent(Long eventId, EventDto eventDto);
    void deleteEvent(Long eventId);

    void deleteExpiredEvents();
}
