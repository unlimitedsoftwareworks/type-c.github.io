import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { MonacoEditorComponent } from '@/components/editor/MonacoEditorComponent';
import { OutputPanel } from '@/components/editor/OutputPanel';
import { Allotment } from 'allotment';
import React from 'react';
import "allotment/dist/style.css";

const Playground: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <EditorToolbar />
            <div className="flex-1">
                <Allotment>
                    <Allotment.Pane>
                        <MonacoEditorComponent />
                    </Allotment.Pane>
                    <Allotment.Pane minSize={300}>
                        <OutputPanel />
                    </Allotment.Pane>
                </Allotment>
            </div>
        </div>
    );
};

export default Playground;
