package com.example.backend.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
	private UUID id;
	private String title;
	private TaskStatus status;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
