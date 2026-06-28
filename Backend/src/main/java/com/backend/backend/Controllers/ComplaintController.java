package com.backend.backend.Controllers;

import com.backend.backend.Models.Complaint;
import com.backend.backend.Services.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "https://your-netlify-site.netlify.app"
        },
        allowCredentials = "true"
)
public class ComplaintController {

    @Autowired
    ComplaintService complaintService;

    @GetMapping("/fetchComplaints")
    public List<Complaint> fetchComplaints(){
        return complaintService.fetchComplaints();
    }
    @PostMapping("/addComplaints")
    public Complaint addComplaint(@RequestBody Complaint complaint){
        return complaintService.addComplaint(complaint);
    }

    @PutMapping("/resolveComplaint/{id}")
    public boolean resolveComplaint(@PathVariable Long id){
        return complaintService.resolveComplaint(id);
    }
    @PutMapping("/inProcessComplaint/{id}")
    public boolean inProcessComplaint(@PathVariable Long id){
        return complaintService.inProcessComplaint(id);
    }

    @PutMapping("/update_priority/{id}/{userId}")
    public boolean update_priority(@PathVariable Long id,@PathVariable Long userId){
        return complaintService.update_priority(id,userId);
    }

    @GetMapping("/hasUpvoted")
    public boolean check_hasUpvoted(@RequestParam Long userId,@RequestParam Long complaintId){
        return complaintService.check_hasUpvoted(userId,complaintId);
    }


}