package com.had.reception;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReceptionApplication {

	// @Autowired
	// private static CacheEvictor cacheEvictor;
	public static void main(String[] args) {
		// cacheEvictor.clearCache();
		SpringApplication.run(ReceptionApplication.class, args);
	}

}
