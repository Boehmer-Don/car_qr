FROM python:3.11

# Add user app
RUN python -m pip install -U pip
# RUN adduser -uid 2001 app
# USER app
WORKDIR /home/app

# set environment varibles
ENV PYTHONFAULTHANDLER 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONHASHSEED random
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on

# install poetry
# RUN pip install --user poetry
RUN pip install poetry
ENV PATH="/home/app/.local/bin:/home/app/.venv/bin/:${PATH}"

# install app dependencies
# COPY --chown=app:app poetry.lock .
# COPY --chown=app:app pyproject.toml .
# COPY --chown=app:app poetry.toml .
COPY poetry.lock .
COPY pyproject.toml .
COPY poetry.toml .

RUN poetry install --no-dev --no-interaction --no-ansi
# add gunicorn
RUN poetry add gunicorn

COPY . .
# COPY --chown=app:app . .
RUN chmod +x ./start_server.sh

EXPOSE 8000
