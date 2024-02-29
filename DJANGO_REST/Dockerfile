FROM python:3.12.2-bookworm

ENV PYTHONUNBUFFERED=1

WORKDIR /home/django_dockerizado

COPY requirements.txt /home/django_dockerizado

RUN pip install -r requirements.txt

COPY . /home/django_dockerizado

EXPOSE 8000

# ENTRYPOINT ["python"] 
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


