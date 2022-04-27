project = "execution-mode"

variable "GITHUB_TOKEN" {
  type = string
  default = ""
}

variable "SENTRY_AUTH_TOKEN" {
  type = string
  default = ""
}

app "app" {
  build {
    use "docker" {
      build_args = {
        "GITHUB_TOKEN" = var.GITHUB_TOKEN
        "SENTRY_AUTH_TOKEN" = var.SENTRY_AUTH_TOKEN
      }
    }

  registry {
      use "aws-ecr" {
        region = "sa-east-1"
        repository = "execution-mode"
        tag = gitrefhash()
      }
    }
  }

  deploy{
    use "exec" {
      command = [
        "bash",
        "-c",
        "bash <(curl -s https://raw.githubusercontent.com/budproj/gist/main/gitops/deploy.sh) -t ${gitrefhash()} -s ${gitreftag()}",
      ]
    }
  }
}
