package com.example.backend.repository;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.Task;
import com.example.backend.entity.TaskStatus;

@Mapper
public interface TaskMapper {
	List<Task> selectActiveTasks(@Param("status") TaskStatus status);

	List<Task> selectTrashedTasks(@Param("status") TaskStatus status);

	void insertTask(Task task);

	void updateTask(Task task);

	void deleteAllTrashedTasks(@Param("status") TaskStatus status);

	void deleteTask(@Param("id") UUID id);
}
