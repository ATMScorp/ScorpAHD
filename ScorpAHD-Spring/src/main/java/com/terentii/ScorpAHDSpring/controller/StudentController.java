package com.terentii.ScorpAHDSpring.controller;

import com.terentii.ScorpAHDSpring.model.event.EventDto;
import com.terentii.ScorpAHDSpring.model.user.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.user.StudentDto;
import com.terentii.ScorpAHDSpring.service.event.EventService;
import com.terentii.ScorpAHDSpring.service.student.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;
    private final EventService eventService;

    public StudentController(StudentService studentService, EventService eventService) {
        this.studentService = studentService;
        this.eventService = eventService;
    }

    @GetMapping("/profile/{studentId}")
    public ResponseEntity<SingleStudentDto> getStudentById(@PathVariable Long studentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("USER"))) {
            SingleStudentDto singleStudentDto = studentService.getStudentById(studentId);
            if (singleStudentDto == null)
                return ResponseEntity.notFound().build();
            return ResponseEntity.ok(singleStudentDto);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }

    }

    @PostMapping("/update/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody StudentDto studentDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("USER"))) {
            StudentDto createdStudentDto = studentService.updateStudent(studentId, studentDto);
            if (createdStudentDto == null)
                return new ResponseEntity<>("Something went wrong.", HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStudentDto);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @GetMapping("/news")
    public ResponseEntity<List<EventDto>> getEventsForStudent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("USER"))) {
            List<EventDto> events = eventService.getAllEvents();
            return ResponseEntity.ok(events);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }
}
