.PHONY: build run stop restart clean logs help

IMAGE_NAME = web-basics-practice
CONTAINER_NAME = web-basics-practice
PORT = 4444

all: build run logs

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -d -p $(PORT):80 --name $(CONTAINER_NAME) $(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME)

restart: stop
	docker rm $(CONTAINER_NAME)
	$(MAKE) all

logs:
	docker logs -f $(CONTAINER_NAME)
