package com.example.backend.dto;

import java.time.LocalDateTime;

import com.example.backend.entity.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDto {

	private String id;

	private String title;

	private TaskStatus status;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
}
