package com.terentii.ScorpAHDSpring.controller;

import com.terentii.ScorpAHDSpring.model.SingleStudentDto;
import com.terentii.ScorpAHDSpring.model.StudentDto;
import com.terentii.ScorpAHDSpring.service.student.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile/{studentId}")
    public ResponseEntity<SingleStudentDto> getStudentById(@PathVariable Long studentId) {
        SingleStudentDto singleStudentDto = studentService.getStudentById(studentId);
        if (singleStudentDto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(singleStudentDto);
    }

    @PostMapping("/update/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody StudentDto studentDto){
        StudentDto createdStudentDto = studentService.updateStudent(studentId, studentDto);
        if (createdStudentDto == null)
            return new ResponseEntity<>("Something went wrong.", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudentDto);
    }
}
