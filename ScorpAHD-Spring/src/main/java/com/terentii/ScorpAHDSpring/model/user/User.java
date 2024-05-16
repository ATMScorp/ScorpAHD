package com.terentii.ScorpAHDSpring.model.user;

import com.terentii.ScorpAHDSpring.model.Role;
import com.terentii.ScorpAHDSpring.model.Token;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "address")
    private String address;

    @Column(name = "gender")
    private String gender;

    @Column(name = "department")
    private String department;

    @Column(name = "field_of_study")
    private String fieldOfStudy;

    @Column(name = "academic_year")
    private String academicYear;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "reset_token")
    private String resetToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Token> tokens;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    public User() {
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public StudentDto getStudentDto() {
        StudentDto studentDto = new StudentDto();
        studentDto.setId(id);
        studentDto.setEmail(email);
        studentDto.setAddress(address);
        studentDto.setDateOfBirth(dateOfBirth);
        studentDto.setFirstName(firstName);
        studentDto.setSecondName(secondName);
        studentDto.setGender(gender);
        studentDto.setAcademicYear(academicYear);
        studentDto.setDepartment(department);
        studentDto.setFieldOfStudy(fieldOfStudy);
        studentDto.setRoomNumber(roomNumber);
        return studentDto;
    }
}
