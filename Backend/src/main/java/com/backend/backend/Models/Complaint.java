package com.backend.backend.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String title;
    private String description;
    private Long userId;
    private int priority;
    private String status;
    private LocalDateTime complaintDate;
    private LocalDateTime resolveDate;
    private String category;
}
