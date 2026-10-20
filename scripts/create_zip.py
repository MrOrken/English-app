import os
import zipfile

def create_project_zip():
    root_dir = os.path.abspath('.')
    public_dir = os.path.join(root_dir, 'public')
    os.makedirs(public_dir, exist_ok=True)
    zip_output_path = os.path.join(public_dir, 'Memory-Boost-Project.zip')

    # Remove previous zip if exists
    if os.path.exists(zip_output_path):
        os.remove(zip_output_path)

    ignore_dirs = {
        'node_modules',
        '.git',
        '.aistudio',
        '__pycache__',
        '.npm',
        '.cache',
    }

    ignore_extensions = {
        '.zip',
        '.log',
    }

    print(f"Creating zip archive at: {zip_output_path}")
    count = 0

    with zipfile.ZipFile(zip_output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for foldername, subfolders, filenames in os.walk(root_dir):
            # Prune ignored directories
            subfolders[:] = [d for d in subfolders if d not in ignore_dirs]

            rel_folder = os.path.relpath(foldername, root_dir)
            if any(part in ignore_dirs for part in rel_folder.split(os.sep)):
                continue

            for filename in filenames:
                ext = os.path.splitext(filename)[1].lower()
                if ext in ignore_extensions:
                    continue

                abs_filepath = os.path.join(foldername, filename)
                rel_filepath = os.path.relpath(abs_filepath, root_dir)

                # Prepend top-level directory name inside zip for clean extraction
                arcname = os.path.join('Memory-Boost-Project', rel_filepath)
                zipf.write(abs_filepath, arcname)
                count += 1

    file_size_mb = os.path.getsize(zip_output_path) / (1024 * 1024)
    print(f"Zip created successfully with {count} files! Size: {file_size_mb:.2f} MB")

if __name__ == '__main__':
    create_project_zip()
