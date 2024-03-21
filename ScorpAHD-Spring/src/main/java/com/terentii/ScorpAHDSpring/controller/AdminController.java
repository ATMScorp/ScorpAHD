package com.terentii.ScorpAHDSpring.controller;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;
import com.terentii.ScorpAHDSpring.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> deleteStudent(@PathVariable Integer studentId) {
        adminService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dashboard/{studentId}")
    public ResponseEntity<SingleStudentDto> getStudentById(@PathVariable Integer studentId) {
        SingleStudentDto singleStudentDto = adminService.getStudentById(studentId);
        if (singleStudentDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(singleStudentDto);
    }

    @PostMapping("/dashboard/update/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Integer studentId, @RequestBody StudentDto studentDto){
        StudentDto createdStudentDto = adminService.updateStudent(studentId, studentDto);
        if (createdStudentDto == null)
            return new ResponseEntity<>("Something went wrong.", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudentDto);
    }
}
