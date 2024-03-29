package com.terentii.ScorpAHDSpring.controller;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;
import com.terentii.ScorpAHDSpring.service.admin.AdminService;
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

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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


}
