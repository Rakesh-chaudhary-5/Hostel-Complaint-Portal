package com.backend.backend.Repository;

import com.backend.backend.Models.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintsRepo extends JpaRepository<Complaint,Long> {
}
