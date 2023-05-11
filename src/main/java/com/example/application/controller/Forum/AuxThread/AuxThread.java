package com.example.application.controller.Forum.AuxThread;

import com.example.application.model.News.News;
import com.example.application.repository.NewsRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

// only used by the dev team to improve performance,
// none of these classes were specified neither in the
// requirements nor in the architecture
public class AuxThread extends Thread {
  List<News> result = new ArrayList<>();

  public void run(NewsRepository newsRepository, int index, int pageSize,
                  String sortString, boolean ascending) {

    this.result = ascending
                      ? newsRepository.findAll(PageRequest.of(
                            index, pageSize, Sort.by(sortString).ascending()))
                      : newsRepository.findAll(PageRequest.of(
                            index, pageSize, Sort.by(sortString).descending()));
  }

  public List<News> getResult() { return this.result; }
}
