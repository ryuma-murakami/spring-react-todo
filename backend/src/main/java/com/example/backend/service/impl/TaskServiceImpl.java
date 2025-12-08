package com.example.backend.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.Task;
import com.example.backend.entity.TaskStatus;
import com.example.backend.repository.TaskMapper;
import com.example.backend.service.TaskService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

	private final TaskMapper taskMapper;

	@Override
	public List<Task> findActiveTasks() {
		return taskMapper.selectActiveTasks(TaskStatus.TRASHED);
	}

	@Override
	public List<Task> findTrashedTasks() {
		return taskMapper.selectTrashedTasks(TaskStatus.TRASHED);
	}

	@Override
	public void createTask(Task task) {
		taskMapper.insertTask(task);
	}

	@Override
	public void updateTask(Task task) {
		taskMapper.updateTask(task);
	}

	@Override
	public void deleteAllTrashedTasks() {
		taskMapper.deleteAllTrashedTasks(TaskStatus.TRASHED);
	}

	@Override
	public void deleteTask(UUID id) {
		taskMapper.deleteTask(id);
	}
}
