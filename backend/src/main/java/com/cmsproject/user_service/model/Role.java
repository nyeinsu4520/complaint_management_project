package com.cmsproject.user_service.model;

import com.cmsproject.shared.enums.StaffRole;

public enum Role {
    CONSUMER,
    HELPDESK_AGENT,
    SUPPORT,
    ADMIN;

    public static boolean isInternalRole(Role role) {
        return role == ADMIN || role == HELPDESK_AGENT || role == SUPPORT;
    }

    public StaffRole toStaffRole() {
    return switch (this) {
        case HELPDESK_AGENT -> StaffRole.HELPDESK_AGENT;
        case SUPPORT -> StaffRole.SUPPORT;
        default -> null;
    };
}

}
