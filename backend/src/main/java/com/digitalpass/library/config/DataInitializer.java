        // Seed Initial Student Reading Progress for Revanth
        ReadingProgress prog1 = ReadingProgress.builder()
                .user(student)
                .ebook(ebook1)
                .currentPage(87)
                .currentChapter("Chapter 4: Meaningful Names & Functions")
                .lastReadAt(LocalDateTime.now().minusHours(3))
                .build();
        progressRepository.save(prog1);

        ReadingProgress prog2 = ReadingProgress.builder()
                .user(student)
                .ebook(ebook2)
                .currentPage(142)
                .currentChapter("Chapter 3: Creational Patterns - Factory Method")
                .lastReadAt(LocalDateTime.now().minusDays(1))
                .build();
        progressRepository.save(prog2);
