package com.digitalpass.library.service;

import com.digitalpass.library.model.IssueTransaction;
import com.digitalpass.library.model.Notification;
import com.digitalpass.library.model.User;
import com.digitalpass.library.repository.IssueTransactionRepository;
import com.digitalpass.library.repository.NotificationRepository;
import com.digitalpass.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ScheduledTaskService {

    @Autowired
    private IssueTransactionRepository transactionRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    // Run every day at midnight (or every 6 hours)
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void checkDueDatesAndSendNotifications() {
        LocalDate today = LocalDate.now();
        List<IssueTransaction> activeTxns = transactionRepository.findByStatus("ISSUED");
        activeTxns.addAll(transactionRepository.findByStatus("RENEWED"));

        for (IssueTransaction txn : activeTxns) {
            LocalDate dueDate = txn.getDueDate();
            long daysUntilDue = ChronoUnit.DAYS.between(today, dueDate);

            User user = txn.getUser();
            String bookTitle = txn.getBookCopy().getBook().getTitle();

            if (daysUntilDue == 7 || daysUntilDue == 3 || daysUntilDue == 1) {
                Notification notif = Notification.builder()
                        .user(user)
                        .title("Book Due Soon (" + daysUntilDue + " days left)")
                        .message("Reminder: Your book '" + bookTitle + "' is due on " + dueDate + ".")
                        .type("DUE_SOON")
                        .build();
                notificationRepository.save(notif);
            } else if (daysUntilDue == 0) {
                Notification notif = Notification.builder()
                        .user(user)
                        .title("Book Due Today!")
                        .message("Notice: Your book '" + bookTitle + "' is due today (" + dueDate + "). Please return or renew it to avoid fines.")
                        .type("DUE_TODAY")
                        .build();
                notificationRepository.save(notif);
            } else if (daysUntilDue < 0) {
                long daysOverdue = Math.abs(daysUntilDue);
                txn.setStatus("OVERDUE");
                transactionRepository.save(txn);

                Notification notif = Notification.builder()
                        .user(user)
                        .title("Book Overdue!")
                        .message("ALERT: Your book '" + bookTitle + "' is " + daysOverdue + " days overdue! Please return it immediately.")
                        .type("OVERDUE")
                        .build();
                notificationRepository.save(notif);
            }
        }
    }
}
