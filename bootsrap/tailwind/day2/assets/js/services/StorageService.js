/**
 * TechNova Learning Hub - MVC Service Layer: StorageService
 * Manages local persistence for user sessions, lesson progress, and certificates.
 */

const StorageService = {
  USER_KEY: "technova_currentUser",
  USERS_LIST_KEY: "technova_registered_users",
  LESSON_PROGRESS_KEY: "technova_lesson_progress",

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Storage get error:", e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage set error:", e);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  getCurrentUser() {
    return this.get(this.USER_KEY);
  },

  saveCurrentUser(user) {
    this.set(this.USER_KEY, user);
    // Sync with users list
    const users = this.get(this.USERS_LIST_KEY) || [];
    const idx = users.findIndex(u => u.email === user.email || u.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    this.set(this.USERS_LIST_KEY, users);
  },

  getCompletedLessons(courseId) {
    const progress = this.get(this.LESSON_PROGRESS_KEY) || {};
    return progress[courseId] || [];
  },

  markLessonComplete(courseId, lessonId) {
    const progress = this.get(this.LESSON_PROGRESS_KEY) || {};
    if (!progress[courseId]) progress[courseId] = [];
    if (!progress[courseId].includes(lessonId)) {
      progress[courseId].push(lessonId);
      this.set(this.LESSON_PROGRESS_KEY, progress);
    }
    return progress[courseId];
  }
};

window.StorageService = StorageService;
