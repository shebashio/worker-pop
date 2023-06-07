# HE POPS Worker

This is a Cloudflare Worker that fetches data from the Hurricane Electric Points of Presence (POPs) API, converts the data to CSV format, and stores it in a Cloudflare Workers KV namespace.

## Requirements

- Node.js
- npm or yarn
- A Cloudflare account with Workers and Workers KV enabled

## Setup

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/he-pops-worker.git
    cd he-pops-worker
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Copy the `wrangler.toml.example` file to `wrangler.toml` and update the `account_id` and `kv_namespaces` values with your actual Cloudflare account ID and KV namespace ID:

    ```bash
    cp wrangler.toml.example wrangler.toml
    nano wrangler.toml
    ```

4. Build the worker:

    ```bash
    npm run build
    ```

5. Publish the worker:

    ```bash
    wrangler publish
    ```

## Usage

Once the worker is published, it will automatically fetch the data from the HE POPs API, convert it to CSV, and store it in the KV namespace every time it receives a request. You can trigger this process by sending a request to the worker's URL.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
