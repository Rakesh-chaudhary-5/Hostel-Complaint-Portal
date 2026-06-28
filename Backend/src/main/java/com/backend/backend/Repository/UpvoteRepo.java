package com.backend.backend.Repository;

import com.backend.backend.Models.Upvote;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface UpvoteRepo extends JpaRepository<Upvote,Long> {

    boolean existsByUserIdAndComplaintId(Long userId, Long complaintId);

    Upvote findByUserId(Long userId);

    @Modifying
    @Transactional
    void deleteByComplaintId(Long id);
}
