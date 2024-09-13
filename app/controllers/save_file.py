import os
import uuid
from werkzeug.datastructures import FileStorage

import filetype
from pathlib import Path

from app.logger import log

UPLOAD_FOLDER = "app/static/uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

BASE_FILE_PATH = Path(UPLOAD_FOLDER)
MAX_FILE_SIZE = 1 * 1024 * 1024  # 1 MB limit


def save_file(file: FileStorage, is_img: bool = False) -> Path:
    """Save file to disk and return the path and extension."""
    log(log.INFO, "Saving file.")
    kind = filetype.guess(file)

    if not kind:
        raise ValueError("Could not determine file type.")

    if not is_img and kind.extension not in ["pdf", "doc", "docx"]:
        raise ValueError("Invalid file type.")

    if file.content_length > MAX_FILE_SIZE:
        raise ValueError("File is too large.")

    file_name = (
        f"{str(uuid.uuid4())}_{file.filename}"
        if file.filename
        else str(uuid.uuid4()) + "." + kind.extension
    )

    file_path = BASE_FILE_PATH / file_name

    with open(file_path, "wb") as f:
        read = file.read()
        f.write(read)

    return (
        Path("uploads") / file_name if is_img else Path("/static/uploads") / file_name
    )
