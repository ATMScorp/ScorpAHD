package com.terentii.ScorpAHDSpring.model;

import lombok.Getter;

@Getter
public class SingleEventDto {
    private EventDto eventDto;

    public void setEventDto(EventDto eventDto) {
        this.eventDto = eventDto;
    }
}
