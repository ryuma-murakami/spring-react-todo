package com.example.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.backend.dto.TaskRequestDto;
import com.example.backend.dto.TaskResponseDto;
import com.example.backend.entity.Task;
import com.example.backend.mapper.TaskDtoMapper;
import com.example.backend.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

	private final TaskService taskService;

	@GetMapping("/active")
	public ResponseEntity<List<TaskResponseDto>> getActiveTasks() {
		List<Task> tasks = taskService.findActiveTasks();
		List<TaskResponseDto> dtos = tasks.stream()
				.map(TaskDtoMapper::toResponseDto)
				.toList();

		return ResponseEntity.ok(dtos);
	}

	@GetMapping("/trashed")
	public ResponseEntity<List<TaskResponseDto>> getTrashedTasks() {
		List<Task> tasks = taskService.findTrashedTasks();
		List<TaskResponseDto> dtos = tasks.stream()
				.map(TaskDtoMapper::toResponseDto)
				.toList();

		return ResponseEntity.ok(dtos);
	}

	@PostMapping
	public ResponseEntity<TaskResponseDto> createTask(@RequestBody TaskRequestDto request) {
		Task task = TaskDtoMapper.toEntity(request);
		taskService.createTask(task);

		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(task.getId())
				.toUri();

		TaskResponseDto response = TaskDtoMapper.toResponseDto(task);

		return ResponseEntity.created(location).body(response);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updateTask(@PathVariable Integer id, @RequestBody TaskRequestDto request) {
		Task task = TaskDtoMapper.toEntity(request);
		task.setId(id);
		taskService.updateTask(task);

		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/trashed")
	public ResponseEntity<Void> deleteAllTrashedTasks() {
		taskService.deleteAllTrashedTasks();

		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
		taskService.deleteTask(id);

		return ResponseEntity.noContent().build();
	}
}
