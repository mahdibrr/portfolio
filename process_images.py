from PIL import Image
import os

# Directory containing the images
input_dir = "public/ghassla"
output_dir = "public/ghassla/processed"

# Create output directory
os.makedirs(output_dir, exist_ok=True)

# Target dimensions - 16:9 aspect ratio for consistent display
target_width = 1920
target_height = 1080

# List of images to process
images = [
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM.png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM (1).png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM (2).png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_01_PM (3).png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_02_PM.png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_02_PM (1).png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_02_PM (2).png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_03_PM.png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_03_PM (1).png",
    "8assla-Service-de-laverie-pressing-à-Tunis-11-14-2025_11_03_PM (2).png",
]

def split_long_image(img, output_base_name, max_height=1500):
    """Split a long vertical image into multiple parts"""
    width, height = img.size

    if height <= max_height:
        return [img]

    parts = []
    num_splits = (height + max_height - 1) // max_height  # Ceiling division
    split_height = height // num_splits

    for i in range(num_splits):
        top = i * split_height
        bottom = min((i + 1) * split_height, height)
        part = img.crop((0, top, width, bottom))
        parts.append(part)

    return parts

def resize_and_pad(img, target_width, target_height):
    """Resize image to fit target dimensions and add padding if needed"""
    # Calculate aspect ratios
    img_aspect = img.width / img.height
    target_aspect = target_width / target_height

    # Resize while maintaining aspect ratio
    if img_aspect > target_aspect:
        # Image is wider - fit to width
        new_width = target_width
        new_height = int(target_width / img_aspect)
    else:
        # Image is taller - fit to height
        new_height = target_height
        new_width = int(target_height * img_aspect)

    img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Create new image with target dimensions and white background
    result = Image.new('RGB', (target_width, target_height), (255, 255, 255))

    # Paste resized image in center
    x_offset = (target_width - new_width) // 2
    y_offset = (target_height - new_height) // 2
    result.paste(img_resized, (x_offset, y_offset))

    return result

# Process each image
for idx, img_name in enumerate(images):
    input_path = os.path.join(input_dir, img_name)

    print(f"Processing {img_name}...")

    try:
        img = Image.open(input_path)

        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')

        width, height = img.size
        print(f"  Original size: {width}x{height}")

        # Check if image is very long (height > 2x width)
        if height > width * 2:
            print(f"  Long image detected, splitting...")
            parts = split_long_image(img, img_name)

            for part_idx, part in enumerate(parts):
                processed = resize_and_pad(part, target_width, target_height)
                output_name = f"ghassla_{idx+1:02d}_{chr(97+part_idx)}.jpg"  # 01_a, 01_b, etc.
                output_path = os.path.join(output_dir, output_name)
                processed.save(output_path, 'JPEG', quality=90, optimize=True)
                print(f"  Saved: {output_name}")
        else:
            # Regular image - just resize and pad
            processed = resize_and_pad(img, target_width, target_height)
            output_name = f"ghassla_{idx+1:02d}.jpg"
            output_path = os.path.join(output_dir, output_name)
            processed.save(output_path, 'JPEG', quality=90, optimize=True)
            print(f"  Saved: {output_name}")

    except Exception as e:
        print(f"  Error: {e}")

print("\nProcessing complete!")
print(f"Processed images saved to: {output_dir}")
