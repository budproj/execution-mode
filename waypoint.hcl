project = "execution-mode"

app "app" {
  build {
    use "docker" {}

    registry {
      use "aws-ecr" {
        region = "sa-east-1"
        repository = "execution-mode"
        tag = gitrefpretty()
      }
    }
  }

  deploy{
    use "exec" {
      command = [
        "bash",
        "-c",
        "bash <(curl -s https://raw.githubusercontent.com/budproj/gist/main/gitops/deploy.sh) -s production -t ${gitrefpretty()}",
      ]
    }
  }
}
