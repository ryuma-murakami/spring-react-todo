package com.example.backend.service;

import java.util.List;

import com.example.backend.entity.Task;

public interface TaskService {

	List<Task> findActive();

	List<Task> findTrashed();

	void create(Task task);

	void update(Task task);

	void deleteAllTrashed();

	void deleteById(Integer id);
}
