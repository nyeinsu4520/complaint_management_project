package com.cmsproject.complaint_service.service;

import com.cmsproject.complaint_service.model.ComplaintResponse;
import java.util.List;

public interface ComplaintResponseService {
    ComplaintResponse addReply(Long complaintId, Long staffUserId, String staffRole, String message);
    List<ComplaintResponse> getRepliesByComplaint(Long complaintId);
}
