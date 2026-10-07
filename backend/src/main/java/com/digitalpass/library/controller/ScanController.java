package com.digitalpass.library.controller;

import com.digitalpass.library.dto.ScanDto.*;
import com.digitalpass.library.service.SmartScanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/librarian/scan")
@CrossOrigin(origins = "*")
public class ScanController {

    @Autowired
    private SmartScanService smartScanService;

    @PostMapping("/dual")
    @PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
    public ResponseEntity<SmartScanResult> processDualScan(@RequestBody DualScanRequest request) {
        SmartScanResult result = smartScanService.analyzeDualScan(request.getStudentQr(), request.getCopyQr());
        return ResponseEntity.ok(result);
    }
}
