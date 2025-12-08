package com.example.backend.dto;

import com.example.backend.entity.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDto {

	private String title;

	private TaskStatus status;
}
