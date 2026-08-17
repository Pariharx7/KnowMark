import { privateClient as apiClient } from "@services";

const BookmarkService = {
  getAllBookmarks: (page, limit = 6) =>
    apiClient.get(`/bookmarks/bulk?page=${page}&limit=${limit}`),

  getAllStarredBookmarks: (page, limit = 6) =>
    apiClient.get(`/bookmarks/starred?page=${page}&limit=${limit}`),

  getBookmarkById: (bookmarkId) => apiClient.get(`/bookmarks/bm/${bookmarkId}`),

  createBookmark: (formData) => apiClient.post("/bookmarks/create", formData),

  starBookmark: (bookmarkId) => apiClient.put(`/bookmarks/star/${bookmarkId}`),

  unstarBookmark: (bookmarkId) =>
    apiClient.delete(`/bookmarks/unstar/${bookmarkId}`),

  deleteBookmark: (bookmarkId) => apiClient.delete(`/bookmarks/${bookmarkId}`),

  updateBookmark: (formData, bookmarkId) =>
    apiClient.patch(`/bookmarks/${bookmarkId}`, formData),

  searchBookmark: (search = "", page = 1) =>
    apiClient.get(
      `/bookmarks/search?query=${encodeURIComponent(search)}&page=${page}&limit=5`,
    ),
};

export default BookmarkService;
