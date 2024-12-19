import { toNano } from '@ton/core';
import { NewListing } from '../wrappers/NewListing';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const newListing = provider.open(
        NewListing.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('NewListing')
        )
    );

    await newListing.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(newListing.address);

    console.log('ID', await newListing.getID());
}
