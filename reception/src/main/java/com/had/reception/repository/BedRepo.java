package com.had.reception.repository;

import java.util.List;
// import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.had.reception.models.Bed;

@Repository
public interface BedRepo extends JpaRepository<Bed,Integer>{
    // Bed findByBedNo(Integer bed_no);
    Optional<Bed> findByBedNoAndWardNo(Integer bedNo, Integer wardNo);
    List<Bed> findByWardNoAndStatus(Integer wardNo, String status);
    @Query("SELECT DISTINCT b.wardNo FROM Bed b")
    List<Integer> findAllDistinctWards();
}
