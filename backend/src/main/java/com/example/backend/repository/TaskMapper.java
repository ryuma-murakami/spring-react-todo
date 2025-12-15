package com.example.backend.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.Task;
import com.example.backend.entity.TaskStatus;

@Mapper
public interface TaskMapper {

	List<Task> selectActive(@Param("status") TaskStatus status);

	List<Task> selectTrashed(@Param("status") TaskStatus status);

	void insert(Task task);

	void update(Task task);

	void deleteAllTrashed(@Param("status") TaskStatus status);

	void deleteById(@Param("id") Integer id);
}
