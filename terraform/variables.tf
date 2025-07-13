variable "project_id" {
  type        = string
  description = "Google Cloud project ID"
}

variable "region" {
  type        = string
  description = "GCP region for Cloud Run"
  default     = "europe-west1"
}

variable "image_url" {
  type        = string
  description = "Docker image URL for the Quasar app"
}
