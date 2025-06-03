IMG := crpi-bbsyw9wy6j39ufia.cn-beijing.personal.cr.aliyuncs.com/containers-wwl/we_image
TAG := v0.1


build:
	docker build -t $(IMG):$(TAG) -f Dockerfile . --no-cache
	docker push $(IMG):$(TAG)