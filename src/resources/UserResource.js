const Resource = require("resources.js");

class UserResource extends Resource {
  toArray() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      email: this.email,
      emailVerifiedAt: this.email_verified_at,
      password: this.password,
      passwordChangedAt: this.password_changed_at,
      active: this.active,
      timezone: this.timezone,
      lastLoginAt: this.last_login_at,
      lastLoginIp: this.last_login_ip,
      toBeLoggedOut: this.to_be_logged_out,
      provider: this.provider,
      providerId: this.provider_id,
      rememberToken: this.remember_token,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      deletedAt: this.deleted_at,
    };
  }
}

module.exports = UserResource;
