package com.backend.backend.Services;

import com.backend.backend.Models.Complaint;
import com.backend.backend.Models.Upvote;
import com.backend.backend.Models.User;
import com.backend.backend.Repository.ComplaintsRepo;
import com.backend.backend.Repository.UpvoteRepo;
import com.backend.backend.Repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    ComplaintsRepo complaintsRepo;

    @Autowired
    UpvoteRepo upvoteRepo;

    @Autowired
    UsersRepo usersRepo;

    public List<Complaint> fetchComplaints() {
     return complaintsRepo.findAll();
    }

    public Complaint addComplaint(Complaint complaint) {

        User user = usersRepo.findById(complaint.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        complaint.setPriority(1);
        complaint.setStatus("PENDING");
        complaint.setUsername(user.getUsername());
        complaint.setComplaintDate(LocalDateTime.now());

        return complaintsRepo.save(complaint);
    }

    public boolean resolveComplaint(Long id) {
        Complaint complaint = complaintsRepo.findById(id).orElse(null);
        if (complaint == null) {
            return false;
        }
        complaint.setStatus("RESOLVED");
        complaint.setPriority(1);
        upvoteRepo.deleteByComplaintId(id);
        complaint.setResolveDate(LocalDateTime.now());
         complaintsRepo.save(complaint);
         return true;
    }

    public boolean update_priority(Long complaintId, Long userId) {

        Complaint complaint = complaintsRepo.findById(complaintId).orElse(null);

        if (complaint == null) {
            return false;
        }

// Find user's current vote
        Upvote oldVote = upvoteRepo.findByUserId(userId);

// User already voted this complaint
        if (oldVote != null &&
                oldVote.getComplaintId().equals(complaintId)) {
            return false;
        }

// Remove old vote if exists
        if (oldVote != null) {

            Complaint oldComplaint =
                    complaintsRepo.findById(oldVote.getComplaintId())
                            .orElse(null);

            if (oldComplaint != null) {
                oldComplaint.setPriority(
                        oldComplaint.getPriority() - 1
                );
                complaintsRepo.save(oldComplaint);
            }

            upvoteRepo.delete(oldVote);
        }

// Add new vote
        Upvote newVote = new Upvote();
        newVote.setUserId(userId);
        newVote.setComplaintId(complaintId);
        upvoteRepo.save(newVote);

        complaint.setPriority(
                complaint.getPriority() + 1
        );
        complaintsRepo.save(complaint);

        return true;

    }

    public boolean check_hasUpvoted(Long userId, Long complaintId) {
        return upvoteRepo.existsByUserIdAndComplaintId(
                userId,
                complaintId
        );
    }

    public boolean inProcessComplaint(Long id) {
        Complaint complaint = complaintsRepo.findById(id).orElse(null);
        complaint.setStatus("inProcess");
        complaintsRepo.save(complaint);
        return true;
    }
}
