package com.backend.backend.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "upvote")
@Data
public class Upvote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long complaintId;
}
