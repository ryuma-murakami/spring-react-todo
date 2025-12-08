package com.example.backend.mapper;

import com.example.backend.dto.TaskRequestDto;
import com.example.backend.dto.TaskResponseDto;
import com.example.backend.entity.Task;

public class TaskDtoMapper {

	public static Task toEntity(TaskRequestDto dto) {
		Task task = new Task();

		task.setTitle(dto.getTitle());
		task.setStatus(dto.getStatus());

		return task;
	}

	public static TaskResponseDto toResponseDto(Task task) {
		return TaskResponseDto.builder()
				.id(task.getId())
				.title(task.getTitle())
				.status(task.getStatus())
				.createdAt(task.getCreatedAt())
				.updatedAt(task.getUpdatedAt())
				.build();
	}
}
