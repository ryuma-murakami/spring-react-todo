package com.example.backend.service.impl;

import java.util.List;

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
	public List<Task> findActive() {
		return taskMapper.selectActive(TaskStatus.TRASHED);
	}

	@Override
	public List<Task> findTrashed() {
		return taskMapper.selectTrashed(TaskStatus.TRASHED);
	}

	@Override
	public void create(Task task) {
		taskMapper.insert(task);
	}

	@Override
	public void update(Task task) {
		taskMapper.update(task);
	}

	@Override
	public void deleteAllTrashed() {
		taskMapper.deleteAllTrashed(TaskStatus.TRASHED);
	}

	@Override
	public void deleteById(Integer id) {
		taskMapper.deleteById(id);
	}
}
