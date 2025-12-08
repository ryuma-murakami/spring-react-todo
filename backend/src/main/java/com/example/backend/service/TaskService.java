package com.example.backend.service;

import java.util.List;
import java.util.UUID;

import com.example.backend.entity.Task;

public interface TaskService {
	List<Task> findActiveTasks();

	List<Task> findTrashedTasks();

	void createTask(Task task);

	void updateTask(Task task);

	void deleteAllTrashedTasks();

	void deleteTask(UUID id);
}
