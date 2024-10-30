from flask_wtf import FlaskForm


class BaseForm(FlaskForm):
    @property
    def format_errors(self) -> str:
        return ".".join(
            [f"{key} - {','.join(value)}".capitalize() for key, value in self.errors.items() if key != "csrf_token"]
        )
