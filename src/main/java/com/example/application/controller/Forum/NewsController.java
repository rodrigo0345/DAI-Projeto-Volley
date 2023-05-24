package com.example.application.controller.Forum;

import com.example.application.controller.Forum.Wrappers.PostSavedType;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.News.News;
import com.example.application.model.User.LoginUser;
import com.example.application.repository.NewsRepository;
import com.example.application.service.NewsService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Endpoint
@AnonymousAllowed
public class NewsController {

  private final NewsRepository newsRepository;

  public NewsController(NewsRepository news) { this.newsRepository = news; }

  public @Nonnull Iterable<News> findAll() throws Exception {
    Iterable<News> newsAux = newsRepository.findAll();
    List<News> newsList = new ArrayList<>();
    for (News n : newsAux) {
      newsList.add(new News(n.getId(), n.getTitle(), n.getContent(),
                            n.getAuthorID(), n.getCreatedAt(), n.getClicks(),
                            n.getLikes(), n.getLikesID(), n.getImage()));
    }
    return newsList;
  }

  public News findByTitle(String title) throws Exception {
    News newsAux = newsRepository.findByTitle(title);
    if (newsAux == null)
      return null;
    return new News(newsAux.getId(), newsAux.getTitle(), newsAux.getContent(),
                    newsAux.getAuthorID(), newsAux.getCreatedAt(),
                    newsAux.getClicks(), newsAux.getLikes(),
                    newsAux.getLikesID(), newsAux.getImage());
  }

  /*
   * public Iterable<News> findByAuthor(User author) throws Exception {
   * Iterable<News> newsAux = newsRepository.findByAuthor(author);
   * List<News> newsList = new ArrayList<>();
   * for (News n : newsAux) {
   * newsList.add(
   * new News(
   * n.getId(),
   * n.getTitle(),
   * n.getContent(),
   * n.getAuthorID(),
   * n.getDate(),
   * n.getClicks()));
   * }
   * return newsList;
   * }
   *
   * public Iterable<News> findLimitedNews(Integer pag, Integer index) throws
   * Exception {
   * Iterable<News> newsAux = newsRepository.findLimitedNews( pag, index);
   * List<News> newsList = new ArrayList<>();
   * for (News n : newsAux) {
   * newsList.add(
   * new News(
   * n.getId(),
   * n.getTitle(),
   * n.getContent(),
   * n.getAuthorID(),
   * n.getDate(),
   * n.getClicks()));
   * }
   * return newsList;
   * }
   */

  public News save(News news) throws Exception {
    if (news == null)
      return null;
    news.setCreatedAt(LocalDateTime.now());
    return newsRepository.save(news);
  }

  public News remove(News news) throws Exception {
    if (news == null)
      return null;
    newsRepository.delete(news);
    return news;
  }

  public Integer getLikes(Long id) throws Exception {
    News news = newsRepository.findById(id);
    if (news == null)
      return null;
    return news.getLikes();
  }

  public ResponseEntity<ResponseType<Boolean>> addLike(PostType post,
                                                       LoginUser user) {
    var response = new ResponseType<Boolean>();
    PostSavedType type = post.getType();
    if (post == null || type.equals(PostSavedType.RIDE)) {
      response.error("Não pode gostar de um post que não seja uma notícia");
      return ResponseEntity.badRequest().body(response);
    }

    News news = post.news;
    if (NewsService.verifyUserHasLiked(news.getId(), user, newsRepository)) {
      response.error("O utilizador já deu gosto!");
      return ResponseEntity.badRequest().body(response);
    }
    news.addLike(user.getId());
    newsRepository.save(news);

    response.success(true);
    return ResponseEntity.ok().body(response);
  }

  public ResponseEntity<ResponseType<Boolean>> removeLike(PostType post,
                                                          LoginUser user) {
    var response = new ResponseType<Boolean>();
    PostSavedType type = post.getType();
    if (type.equals(PostSavedType.RIDE)) {
      response.error(
          "Não pode remover um gosto de um post que não seja uma notícia");
      return ResponseEntity.badRequest().body(response);
    }

    News news = post.news;
    if (!NewsService.verifyUserHasLiked(news.getId(), user, newsRepository)) {
      response.error("O utilizador nunca chegou a dar gosto!");
      return ResponseEntity.badRequest().body(response);
    }
    news.removeLike(user.getId());
    newsRepository.save(news);
    response.success(true);
    return ResponseEntity.ok().body(response);
  }

  public boolean checkUserHasLiked(News news, LoginUser user) {
    if (News.hasLiked(news.getLikesID(), user))
      return true;
    return false;
  }
}
