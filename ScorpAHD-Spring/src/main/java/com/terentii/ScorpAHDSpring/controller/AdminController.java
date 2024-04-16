package com.terentii.ScorpAHDSpring.controller;

import com.terentii.ScorpAHDSpring.model.event.EventDto;
import com.terentii.ScorpAHDSpring.model.event.SingleEventDto;
import com.terentii.ScorpAHDSpring.model.user.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.user.StudentDto;
import com.terentii.ScorpAHDSpring.service.admin.AdminService;
import com.terentii.ScorpAHDSpring.service.event.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;
    private final EventService eventService;

    public AdminController(AdminService adminService, EventService eventService) {
        this.adminService = adminService;
        this.eventService = eventService;
    }

    @PostMapping("/student")
    public ResponseEntity<?> addStudent(@RequestBody StudentDto studentDto){
        StudentDto createdStudentDto = adminService.postStudent(studentDto);
        if (createdStudentDto == null)
            return new ResponseEntity<>("Something went wrong.", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudentDto);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<List<StudentDto>> getAllStudents(){
        List<StudentDto> allStudents = adminService.getAllStudents();
        return ResponseEntity.ok(allStudents);
    }

    @DeleteMapping("/dashboard/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            adminService.deleteStudentById(studentId);
            return ResponseEntity.noContent().build();
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @GetMapping("/dashboard/{studentId}")
    public ResponseEntity<SingleStudentDto> getStudentById(@PathVariable Long studentId) {
        SingleStudentDto singleStudentDto = adminService.getStudentById(studentId);
        if (singleStudentDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(singleStudentDto);
    }

    @PostMapping("/dashboard/update/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody StudentDto studentDto){
        StudentDto createdStudentDto = adminService.updateStudent(studentId, studentDto);
        if (createdStudentDto == null)
            return new ResponseEntity<>("Something went wrong.", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudentDto);
    }

    @PostMapping("/send")
    public void sendMail(
            @RequestParam String to,
            @RequestParam(required = false) String cc,
            @RequestParam String subject,
            @RequestParam String body,
            @RequestParam(required = false) MultipartFile[] files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            adminService.sendMail(to, cc, subject, body, files);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @PostMapping("/send/send-to-all")
    public void sendMailToAll(
            @RequestParam String subject,
            @RequestParam String body,
            @RequestParam(required = false) MultipartFile[] files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            adminService.sendMailToAllUsers(subject, body, files);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @PostMapping("/event")
    public ResponseEntity<?> createEvent(@RequestBody EventDto eventDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            EventDto createdEventDto = eventService.createEvent(eventDto);
            if (createdEventDto == null) {
                return new ResponseEntity<>("Failed to create event.", HttpStatus.BAD_REQUEST);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEventDto);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @GetMapping("/events")
    public ResponseEntity<List<EventDto>> getAllEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            eventService.deleteExpiredEvents();

            List<EventDto> events = eventService.getAllEvents();
            return ResponseEntity.ok(events);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<SingleEventDto> getEventById(@PathVariable Long eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            SingleEventDto singleEventDto = eventService.getEventById(eventId);
            if (singleEventDto == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(singleEventDto);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @PutMapping("/event/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody EventDto eventDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            EventDto updatedEventDto = eventService.updateEvent(eventId, eventDto);
            if (updatedEventDto == null) {
                return new ResponseEntity<>("Failed to update event.", HttpStatus.BAD_REQUEST);
            }
            return ResponseEntity.ok(updatedEventDto);
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }

    @DeleteMapping("/event/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            eventService.deleteEvent(eventId);
            return ResponseEntity.noContent().build();
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }
}
