export const PERMISSION_KEY = {
  /**
   * "ADMIN" related permissions
   */
  admin: {
    /**
     * Permissions related to the admin dashboard
     */
    dashboard: {
      /**
       * Can the user view the admin dashboard
       */
      view: "ADMIN_DASHBOARD_VIEW",
    },
    /**
     * Permissions related to the administratino of users
     */
    users: {
      /**
       * Can the user view all the other users in the application
       */
      view: "ADMIN_USERS_VIEW",
      /**
       * Can the user edit users within the application
       */
      edit: "ADMIN_USERS_EDIT",
    },
  },
};
